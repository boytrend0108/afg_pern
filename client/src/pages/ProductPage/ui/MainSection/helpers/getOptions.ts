import {
  OptionType,
  ProductOptionsType,
} from '../../../../../entities/ProductItem/types';
import { OptionGroupe } from '../types';

export const getOptions = (data: OptionType[]): OptionGroupe => {
  const options: Partial<ProductOptionsType> = {};

  data.forEach((el: OptionType) => {
    options[el.title] = el.description;
  });

  const common = {
    Type: options.type || '',
    Location: options.location || '',
    // Certificate: options.certificate || '',
    // 'Serial Number': options.serialNumber || '',
    // Description: options.descriptions || '',
  };

  const sizes = {
    Length: options.length || '',
    width: options.width || '',
    height: options.height || '',
    weight: options.weight || '',
  };

  const engine = {
    brand: options.engineBrand || '',
    model: options.engineModel || '',
    capacity: options.capacity || '',
  };

  const tires = {
    chain: options.tracksChain || '',
    plate: options.tracksPlate || '',
    sprocket: options.tracksSprocket || '',
    'Plate Width': options.tracksPlateWidth || '',
  };

  const other = {
    'Quick Coupler': options.quickCoupler || '',
    radio: options.radio || '',
    'Extra Huidraulic': options.extraHuidraulic || '',
    'Hummer Function': options.hammerFunction || '',
  };

  const optionGroupe = {
    common,
    sizes,
    engine,
    tires,
    other,
  };

  return optionGroupe;
};
