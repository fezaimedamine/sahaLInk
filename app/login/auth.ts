/**
 * Represents the structure of login form data.
 *
 * This interface defines the required data fields for a login form:
 * - `email`: The user's email address, which should be a string.
 * - `password`: The user's password, which should also be a string.
 *
 * @interface LoginFormData
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Defines the possible roles a user can have.
 *
 * The `UserRole` type alias allows only two possible values:
 * - 'doctor': Represents a user with the role of a doctor.
 * - 'patient': Represents a user with the role of a patient.
 *
 * @type UserRole
 */
export type UserRole = 'doctor' | 'patient';

