'use server';

import { collection, addDoc, Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';


// Define a more specific type for the 'details' object
export type RequestDetails = {
    // Common fields
    employeeName?: string;
    description?: string;
    // Leave request
    leaveType?: string;
    startDate?: string;
    endDate?: string;
    // Expense request
    expenseType?: string;
    amount?: string; // This will now be amount EXCLUDING VAT
    kdvRate?: number;
    kdv?: string; // This is the calculated VAT amount
    totalAmount?: string; // This is the user-inputted amount INCLUDING VAT
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

  // Use the non-blocking function to add the document
  addDocumentNonBlocking(requestsCollection, data);
}
