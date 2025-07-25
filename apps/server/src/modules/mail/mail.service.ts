import { Injectable } from '@nestjs/common';

/**
 * Service responsible for sending emails
 */
@Injectable()
export class MailService {
  /**
   * Send a verification email to a user
   * @param email - User's email address
   * @returns Promise that resolves when the email is sent
   */
  async sendVerificationEmail(email: string): Promise<void> {
    // In a real application, you would generate a token,
    // save it to the database, and send an email with a verification link
    console.log(`Sending verification email to ${email}`);
    // Implementation would depend on your email service provider
  }
}
