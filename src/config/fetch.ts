import { get } from "./axios.js";

async function fetch(url: string, config: object) {
    // Define states
    let state = {
      loading: true,
      data: null,
      error: null,
      settled: false
    };
  
    // Update state to reflect loading
    // console.log('Loading:', state.loading);
  
    await get(url, config)
      .then((response) => {
        // Update state on success
        state = {
          loading: false,
          data: response.data,
          error: null,
          settled: true
        };
        // console.log('Success:', state);
      })
      .catch((error) => {
        // Update state on error
        state = {
          loading: false,
          data: null,
          error: error.message,
          settled: true
        };
        // console.log('Error:', state);
      });

    return state;
  }
  
export default fetch;
  