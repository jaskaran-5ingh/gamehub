import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import usePlatform from '../hooks/usePlatform';
import usePlatforms from '../hooks/usePlatforms';
import useGameQueryStore from '../store';
import useQueryParameter from '../hooks/useQueryParameter';
import { useEffect } from 'react';

const PlatformSelector = () => {
  const { data, error } = usePlatforms();
  const [platformParameter, setPlatformParameter] =
  useQueryParameter("platformId");
  const setSelectedPlatformId = useGameQueryStore(s => s.setPlatformId);
  const selectedPlatformId = useGameQueryStore(s => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  useEffect(() => {
    if (platformParameter) {
      setSelectedPlatformId(parseInt(platformParameter));
    }
  }, [platformParameter]);

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || 'Platforms'}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem
            onClick={() => {
              setSelectedPlatformId(platform.id);
              setPlatformParameter(`${platform.id}`);
            }}
            key={platform.id}
          >
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
