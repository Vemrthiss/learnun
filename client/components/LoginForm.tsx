import React, { useState } from 'react';
import { useForm } from '@mantine/hooks';
import { TextInput, Button, Paper, useMantineTheme, Text, Title, PasswordInput } from '@mantine/core';
import { LockOpen1Icon, EnvelopeClosedIcon } from '@modulz/radix-icons';
import { BasicFormProps } from '../types/form';

export default function LoginForm({
    noShadow,
    noPadding,
    noSubmit,
    style
}: BasicFormProps) {
    const [error, setError] = useState<string>('');
    const theme = useMantineTheme();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    
        validationRules: {
            email: value => value.includes('@'),
            password: value => value.length > 0
        },
    
        errorMessages: {
            email: 'Please enter a valid email',
            password: 'Please enter a password'
        },
    });

    const handleSubmit = async () => {
        console.log('logging in');
    }

    return (
        <Paper
            padding={noPadding ? 0 : 'lg'}
            shadow={noShadow ? undefined : 'sm'}
            style={{
                position: 'relative',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                ...style,
            }}
        >
            <Title order={2} mb="md" >Login</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    required
                    placeholder="Your email"
                    label="Email"
                    icon={<EnvelopeClosedIcon/>}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    my="md"
                    required
                    placeholder="Your password"
                    label="Password"
                    icon={<LockOpen1Icon/>}
                    {...form.getInputProps('password')}
                />

                {error && (
                    <Text color="red" size="sm" mt="sm">
                        {error}
                    </Text>
                )}

                <Button color="blue" type="submit">
                    Login
                </Button>
            </form>
        </Paper>
    )
}