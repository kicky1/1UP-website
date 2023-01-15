'use client'

import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { forwardRef } from 'react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
          color: theme.colorScheme !== 'dark' ? theme.colors.gray[4]  : theme.black,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#084e5c',        },

        [theme.fn.smallerThan('xs')]: {
          display: 'none',
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

export { UserButton };

