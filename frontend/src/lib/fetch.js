export default (url, method, body = null, config = null) => {
    const requestTypesWithBody = ["POST", "PUT"];

    return new Promise((resolve, reject) => {
        const methods = {
            method,
        }
        const headers = {
            "Content-Type": "application/json",
        };
        console.log({
            method: methods,
            headers: (config && config.headers) || headers,
            ...(requestTypesWithBody.indexOf(method) !== -1 && {
                body: JSON.stringify(body),
            }),
        });
        fetch(url, {
            method: method,
            headers: (config && config.headers) || headers,
            ...(requestTypesWithBody.indexOf(method) !== -1 && {
                body: JSON.stringify(body),
            }),
        })
        .then((res) => {
            if (res.status === 200) resolve(res);
            else reject(res);
        })
        .catch((error) => reject(error));
    });
};