
const BASE_URL = 'http://localhost:8000';
const RESOURSE_URL = `${BASE_URL}/parks`;

const baseRequest = async ({ urlPath = "", method = 'GET', body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            reqParams.body = JSON.stringify(body)
        };


        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams)
    } catch (error) { }
}

export const getAllParks = async ({ search = '', sortBy = '', sortDesc = false } = {}) => {
    const queryParams = new URLSearchParams({ search, sortBy, sortDesc });
    const rawRes = await baseRequest({ urlPath: `?${queryParams.toString()}`, method: "GET" });
    return rawRes.json();
};


export const postPark = (body) => baseRequest({ method: "POST", body });

export const deletePark = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });

export const updatePark = async (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body })