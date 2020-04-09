import axios, { AxiosAdapter } from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

// enhance the original axios adapter with throttle and cache enhancer, very simple http caching strategy.
const axiosCache = axios.create({
	baseURL: '/',
	headers: { 'Cache-Control': 'no-cache' },
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter))
});

export { axiosCache };