function getResults(apiurl, httpmethod) {
  return fetch(apiurl, {
    method: httpmethod,    
    }).then(handleErrors).then(res => res.json());
}

function getPlot(plotapiurl) {
  return fetch(plotapiurl).then(handleErrors).then(res => res.json());
}

function fakeGetResults() {
  return new Promise(resolve => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
      () =>
        resolve({
          products: [
            {
              Title: "Star Wars: Episode IV - A New Hope",
              Year: "1977"
            },
            {
              Title: "Star Wars: Episode V - The Empire Strikes Back",
              Year: "1980"
            },
            {
              Title: "Star Wars: Episode VI - Return of the Jedi",
              Year: "1983"
            }
          ]
        }),
      1000
    );
  });
}

export function fetchResults(apiurl, httpmethod) {
  return async dispatch => {
    const items_per_page = 3;
    dispatch(fetchResultsBegin());
    try {
      const json = await getResults(apiurl, httpmethod);
      if(json.Response === 'True') {
        const movies = json.Search;
        let x = 1; let y = 1;
        for (let i=0; i<movies.length; i++) {
          if (x > items_per_page) {
            x = 1; y++;
          }
          const plotapiurl = new URL(apiurl);
          plotapiurl.searchParams.delete("s");
          plotapiurl.searchParams.append("i", movies[i].imdbID);
          const json_plot = await getPlot(plotapiurl);
          if (json_plot.Response === 'True') {
            movies[i].Plot = json_plot.Plot;
          } else {
            movies[i].Plot = "Error querying plot";
          }
          movies[i].Page = y;
          x++;
        }
        console.log(movies);
        dispatch(fetchResultsSuccess(movies));
        dispatch(getTotalPages(y));
        return movies;
      } else {
        dispatch(fetchResultsFailure(json.Error));
      }
    } catch (error) {
      let errorMsg = error.toString();
      if (errorMsg.indexOf('Failed to fetch') !== -1) {
        return dispatch(fetchResultsFailure("Query failure! Failed to fetch from URL"));
      } else {
        return dispatch(fetchResultsFailure("Query failure! API Key is invalid"));
      }
    }
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_BEGIN = "FETCH_BEGIN";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const GET_TOTALPAGES = "GET_TOTALPAGES";

export const fetchResultsBegin = () => ({
  type: FETCH_BEGIN
});

export const fetchResultsSuccess = results => ({
  type: FETCH_SUCCESS,
  payload: { results }
});

export const getTotalPages = pages => ({
  type: GET_TOTALPAGES,
  payload: { pages }
});

export const fetchResultsFailure = error => ({
  type: FETCH_FAILURE,
  payload: { error }
});
  