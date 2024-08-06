import { productAction } from '../../../../../entities/ProductItem';

type CloseTabProps = {
  dispatch: any;
  onClose: () => void;
};

export const closeTab = ({ dispatch, onClose }: CloseTabProps) => {
  dispatch(productAction.clearCompare());
  onClose();
};
