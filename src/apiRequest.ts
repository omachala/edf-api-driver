import fetch from 'node-fetch';
import { ApiRequest, ApiResponse } from '../types';

const today = new Date();
const currentYear = today.getFullYear();
const currentMont = today.getMonth() + 1;

const apiRequest = async ({
  year = currentYear,
  month = currentMont,
  session,
}: ApiRequest): Promise<ApiResponse> => {
  const monthWithLeadingZero = String(month).padStart(2, '0');
  const fullMonth = `${year}-${monthWithLeadingZero}`;
  const response = await fetch(
    `https://my.edfenergy.com/smartdata/${fullMonth}/month/`,
    {
      headers: { cookie: `${session.name}=${session.value}` },
      method: 'POST',
    },
  );
  const json = await response.json();
  return json as ApiResponse;
};

export default apiRequest;
