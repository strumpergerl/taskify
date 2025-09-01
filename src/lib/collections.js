// Kényelmi ref-építők (egységes path-ok)
import { collection, doc } from 'firebase/firestore'
import { db } from './firebase'

// groups
export const groupDoc = (groupId) => doc(db, 'groups', groupId)
export const membersCol = (groupId) => collection(db, 'groups', groupId, 'members')
export const memberDoc = (groupId, userId) => doc(db, 'groups', groupId, 'members', userId)

// tasks & comments
export const tasksCol = (groupId) => collection(db, 'groups', groupId, 'tasks')
export const taskDoc = (groupId, taskId) => doc(db, 'groups', groupId, 'tasks', taskId)
export const commentsCol = (groupId) => collection(db, 'groups', groupId, 'taskComments')

// rewards, purchases, ledger
export const rewardsCol = (groupId) => collection(db, 'groups', groupId, 'rewards')
export const rewardDoc = (groupId, rewardId) => doc(db, 'groups', groupId, 'rewards', rewardId)
export const purchasesCol = (groupId) => collection(db, 'groups', groupId, 'purchases')
export const purchaseDoc = (groupId, purchaseId) => doc(db, 'groups', groupId, 'purchases', purchaseId)
export const ledgerCol = (groupId) => collection(db, 'groups', groupId, 'pointTransactions')
