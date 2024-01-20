import { err } from '../logging';
import { AppChatMessage } from '../types/Chat';
import { Methods } from '../types/Http';
import makeFetchRequest, { createRequest } from './makeFetchRequest';

export async function postMessage(url: string, msg: AppChatMessage): Promise<AppChatMessage> {
  try {
    const response = await makeFetchRequest(createRequest(url, Methods.POST, msg));
    return response;
  } catch (e) {
    err(e);
    throw e;
  }
}