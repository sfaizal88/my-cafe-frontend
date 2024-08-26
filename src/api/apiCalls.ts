/**
 * 
 * Geneic call API
 * @author - NA 
 * @date - 24th August, 2024
 * 
 */
// GENERIC API TYPE
type ApiOptionType = {
    url: string, 
    method?: string,
    data?: any,
}

// GENERICL FETCH POST / GET API CALL
export const callDataAPI = async({
    url,
    method = 'GET',
    data
}: ApiOptionType) => {
    // OPTIONAL 
    const optional = data ? {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    } : {method};


    // CREATING THE API CALL
    const response = await fetch(url, optional);
    // CHECKING WHETHER ERROR OCCURED
    if (!response.ok) {
        throw new Error("Server error");
    }
    // WAITING FOR DATA REPONSE
    const output = await response.json();
    // IF NO ERROR, THROW THE RESPOSE DATA
    return output;
};