import { useXHR } from './useXHR'
import { useXHRAwait } from './useXHRAwait'
import { useFetch } from './useFetch'
import { useFetchAwait } from './useFetchAwait'
import { useAxios } from './useAxios'
import { useAxiosAwait } from './useAxiosAwait'

// const useHttpRequest = useXHR;
// const useHttpRequest = useXHRAwait;
// const useHttpRequest = useFetch;
// const useHttpRequest = useFetchAwait;
// const useHttpRequest = useAxios;
const useHttpRequest = useAxiosAwait;

export { useHttpRequest }