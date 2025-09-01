// Minimális üzleti műveletek: claim task, státusz váltás, vásárlás létrehozás
import {
  runTransaction, serverTimestamp, updateDoc, setDoc, getDoc
} from 'firebase/firestore'
import { taskDoc, rewardDoc, purchasesCol } from './collections'
import { auth } from './firebase'

// 1) Poolból felvétel (claim) – ütközésmentes
export async function claimTask(groupId, taskId) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Nincs bejelentkezés')

  await runTransaction(taskDoc(groupId, taskId).firestore, async (tx) => {
    const ref = taskDoc(groupId, taskId)
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('A feladat nem található')
    const t = snap.data()
    if (t.assignee || t.status !== 'not_started') throw new Error('Már elvitték')

    tx.update(ref, {
      assignee: uid,
      status: 'in_progress',
      claimedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  })
}

// 2) Saját feladat státusz váltás (in_progress -> done/blocked)
export async function setMyTaskStatus(groupId, taskId, nextStatus) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Nincs bejelentkezés')

  await runTransaction(taskDoc(groupId, taskId).firestore, async (tx) => {
    const ref = taskDoc(groupId, taskId)
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('A feladat nem található')
    const t = snap.data()
    if (t.assignee !== uid) throw new Error('Nem a te feladatod')

    const allowed = ['in_progress', 'done', 'blocked']
    if (!allowed.includes(nextStatus)) throw new Error('Nem engedett státusz')
    tx.update(ref, { status: nextStatus, updatedAt: serverTimestamp() })
  })
}

// 3) Shop vásárlás (kupon létrehozása) – ár bemásolva, státusz 'purchased'
export async function buyReward(groupId, rewardId) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Nincs bejelentkezés')

  const rSnap = await getDoc(rewardDoc(groupId, rewardId))
  if (!rSnap.exists()) throw new Error('Nincs ilyen jutalom')
  const r = rSnap.data()
  if (r.active !== true) throw new Error('A jutalom nem aktív')

  const pRef = doc(purchasesCol(groupId)) // auto id
  await setDoc(pRef, {
    groupId,
    userId: uid,
    rewardId,
    pricePointsAtPurchase: r.pricePoints,
    status: 'purchased',
    createdAt: serverTimestamp(),
  })
}
