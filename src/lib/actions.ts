'use server';

import { collection, addDoc, Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { toast } from '@/hooks/use-toast';


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
    toast({
        title: "Talep Gönderildi!",
        description: "Talebiniz başarıyla yönetici onayına gönderilmiştir.",
    });
  } catch(e) {
      const permissionError = new FirestorePermissionError({
        path: requestsCollection.path,
        operation: 'create',
        requestResourceData: data,
      })
      errorEmitter.emit('permission-error', permissionError);
  }
}