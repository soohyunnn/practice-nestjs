export interface IemailService {
  sendMemberJoinVerification: (email, signupVerifyToken) => Promise<void>;
}
