import { useFilterStore } from '@/app/store/filtersStore';
import Button from '@/app/shared-components/button/Button';

const ResetFilterButton = () => {
  const { resetFilters } = useFilterStore();

  return (
    <Button text='Reset filter' onClick={resetFilters} type='primary' typeAttribute='button' size='filter'/>
  );
};

export default ResetFilterButton;