'use server';

import { collection, addDoc, setDoc, doc, deleteDoc, Firestore } from 'firebase/firestore';

// Define a more specific type for the 'details' object
export type RequestDetails = {
    // Common fields
    employeeName?: string;
    description?: string;
    // Leave request
    leaveType?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    // Expense request
    expenseType?: string;
    amount?: string;
    // Travel request
    travelRequestType?: string;
    city?: string;
    hotel?: string;
    departureCity?: string;
    departureAirport?: string;
    arrivalCity?: string;
    arrivalAirport?: string;
    secondPassenger?: string;
     // HR Document request
    documentType?: string;
    // Vehicle Request
    requesterName?: string;
    vehiclePlate?: string;
    vehicleKm?: string;
    destination?: string;
    // could also have a generic 'data' field for anything else
    [key: string]: any;
};


export interface ApprovalRequest {
  id: string;
  employeeId: string;
  approverId: string;
  requestType: string;
  requestDate: string;
  details: RequestDetails;
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi';
  approvalDate?: string;
  comments?: string;
}

interface CreateApprovalRequestInput {
  employeeId: string;
  approverId: string;
  requestType: string;
  details: RequestDetails;
}

export interface PersonnelData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  department: string;
  phone?: string;
  birthDate?: string;
  startDate?: string;
  photoUrl?: string;
}

export interface UpdatePersonnelData extends PersonnelData {
  id: string;
}

export interface JobPostingData {
  title: string;
  description: string;
  requirements: string;
  department: string;
  location: string;
  type: string;
}

export interface UpdateJobPostingData extends JobPostingData {
  id: string;
}


/**
 * Creates a new approval request document in Firestore.
 * @param firestore - The Firestore instance.
 * @param requestData - The data for the new request.
 */
export async function createApprovalRequest(
  firestore: Firestore,
  requestData: CreateApprovalRequestInput
): Promise<void> {
  const requestsCollection = collection(firestore, 'approvalRequests');
  const data = {
      ...requestData,
      requestDate: new Date().toISOString(),
      status: 'Beklemede',
  };

  try {
    await addDoc(requestsCollection, data);
  } catch(e) {
    console.error("Error creating approval request:", e);
    throw e;
  }
}

export async function createPersonnel(
  firestore: Firestore,
  personnelData: PersonnelData
): Promise<void> {
  const newDocRef = doc(collection(firestore, 'userProfiles'));
  const dataToSave = {
    ...personnelData,
    email: personnelData.email.toLowerCase(),
    id: newDocRef.id, 
    skills: [],
    experience: '',
    phone: personnelData.phone || '',
    photoUrl: personnelData.photoUrl || '',
    birthDate: personnelData.birthDate || '',
    startDate: personnelData.startDate || '',
  };
  try {
    await setDoc(newDocRef, dataToSave);
  } catch (e) {
    console.error("Error creating personnel:", e);
    throw e;
  }
}

export async function updatePersonnel(
  firestore: Firestore,
  personnelData: UpdatePersonnelData
): Promise<void> {
  const { id, ...dataToUpdate } = personnelData;
  const docRef = doc(firestore, 'userProfiles', id);
  try {
    await setDoc(docRef, { ...dataToUpdate, email: dataToUpdate.email.toLowerCase() }, { merge: true });
  } catch (e) {
    console.error("Error updating personnel:", e);
    throw e;
  }
}

export async function deletePersonnel(
  firestore: Firestore,
  personnelId: string
): Promise<void> {
  const docRef = doc(firestore, 'userProfiles', personnelId);
  try {
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting personnel:", e);
    throw e;
  }
}

export async function createJobPosting(
  firestore: Firestore,
  jobData: JobPostingData
): Promise<void> {
  const newDocRef = doc(collection(firestore, 'jobPostings'));
  const dataToSave = {
    ...jobData,
    id: newDocRef.id,
    postedDate: new Date().toISOString(),
  };
  try {
    await setDoc(newDocRef, dataToSave);
  } catch (e) {
    console.error("Error creating job posting:", e);
    throw e;
  }
}

export async function updateJobPosting(
  firestore: Firestore,
  jobData: UpdateJobPostingData
): Promise<void> {
  const { id, ...dataToUpdate } = jobData;
  const docRef = doc(firestore, 'jobPostings', id);
  try {
    await setDoc(docRef, dataToUpdate, { merge: true });
  } catch (e) {
    console.error("Error updating job posting:", e);
    throw e;
  }
}

export async function deleteJobPosting(
  firestore: Firestore,
  jobId: string
): Promise<void> {
  const docRef = doc(firestore, 'jobPostings', jobId);
  try {
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting job posting:", e);
    throw e;
  }
}
