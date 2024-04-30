import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/configs/storeConfig';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
