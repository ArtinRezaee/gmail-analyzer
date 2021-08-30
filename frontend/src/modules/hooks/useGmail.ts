import axios, { AxiosResponse } from 'axios';
import { apiPaths } from '../../paths';
import { environment } from '../../environment';

export type AuthenticationResponse = {
  authorizationUrl: string;
  message: string;
};
export type EmailResponse = {
  messages: string[];
  nextPage: string;
};

export type GmailResponse = {
  authenticateGmail: () => Promise<AxiosResponse<AuthenticationResponse>>;
  getEmails: () => Promise<AxiosResponse<EmailResponse>>;
};

export const useGmail = (): GmailResponse => {
  const authenticateGmail = (): Promise<
    AxiosResponse<AuthenticationResponse>
  > => {
    return axios.get(`${environment.SERVER_BASE_URL}${apiPaths.GMAIL_AUTH}`);
  };

  const getEmails = (): Promise<AxiosResponse<EmailResponse>> => {
    const data = {
      includeSpamTrash: false,
      labelIds: ['SENT'],
      maxResults: 300,
      pageToken: '',
    };
    const headers = {
      'Access-Control-Allow-Origin': '*',
    };

    return axios.get(`${environment.SERVER_BASE_URL}${apiPaths.GET_MESSAGES}`, {
      params: data,
      headers,
    });
  };

  return {
    authenticateGmail,
    getEmails,
  };
};
