// Simple email service for frontend form handling
// This will be replaced with actual backend API calls

import axios from "axios";

export interface ContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  description: string;
}

export const sendContactEmail = async (formData: ContactFormData) => {
  // For now, simulate email sending
  // In production, this should call your backend API
  try {
    // Simulate API call delay
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // const resp = await axios.post('http://localhost:4000/register', formData);

    // Log form data for development
    // console.log('Contact form submitted:', resp.data);
    
    // Return success for now
    return { success: true, messageId: 'simulated-' + Date.now() };
  } catch (error) {
    console.error('Form submission failed:', error);
    return { success: false, error: 'Failed to submit form' };
  }
};

export const sendQuoteRequestEmail = async (formData: ContactFormData & { service?: string }) => {
  // For now, simulate email sending
  // In production, this should call your backend API
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Log form data for development
    console.log('Quote request submitted:', formData);
    
    // Return success for now
    return { success: true, messageId: 'simulated-' + Date.now() };
  } catch (error) {
    console.error('Quote request failed:', error);
    return { success: false, error: 'Failed to submit quote request' };
  }
};