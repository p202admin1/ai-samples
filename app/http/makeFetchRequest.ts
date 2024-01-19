
export default async function makeFetchRequest(request: Request): Promise<any> {
  try {
    const response = await fetch(request).then(r => r.json());
    return response;
  } catch (e) {
    console.error(`error fetching with 'makeFetchRequest' ${e}`);
    throw e;
  }
}

export function createRequest(url: string, method: string, body: any) {
  return new Request(url, {method: method, body: JSON.stringify(body)})
}