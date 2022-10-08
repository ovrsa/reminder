import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import {
  AddIcon,
  EditIcon,
  SearchIcon
} from '@chakra-ui/icons';

// LinkItemの型
interface LinkItemProps {
  name: string;
  icon: IconType;
}
// LinkItemの見た目データ
const LinkItems: Array<LinkItemProps> = [
  { name: 'Add', icon: AddIcon },
  { name: 'Memo', icon: EditIcon },
  { name: 'Search', icon: SearchIcon },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  // isOpen: 折りたたみを発火させる際のトリガー
  // useDisclosure: chakra-uiのカスタムフック、開く、閉じるの支援
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    // minH:要素の最小高 
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      {/* Menuが折りたたまれた際の動き */}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      {/* display={{}}: レスポンシブ構文 */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  // void:（引数とか戻り値とかが）ないことを表す目印として使われる用語
  // 引数や戻り値とかがないときに「ない」の目印として使われる
  onClose: () => void;
}

// ...rest:
const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      // pos:positionの事 fixed:画面の決まった位置に固定する
      pos="fixed"
      h="full"
      {...rest}>
      {/* justifyContent: フレックスコンテナの主軸およびグリッドコンテナーのインライン軸に沿って、中身のアイテムの間や周囲に間隔を配置する*/}
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* VStack:縦方向に要素を並べる */}
        <VStack>
          {/* Avatar:アイコン */}
          <Avatar
            mt={8}
            size={'sm'}
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          />
          {/* タイトルテキスト */}
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" >
            Tone
          </Text>
        </VStack>
        {/* menuを閉じる際の×アイコン */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} mt={5} >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
}

// NavItemの呼び出し関数
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};