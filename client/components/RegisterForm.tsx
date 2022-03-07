import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/hooks';
import { TextInput, Button, Paper, useMantineTheme, Text, Title, PasswordInput, Progress, Popover, Box } from '@mantine/core';
import { LockClosedIcon, EnvelopeOpenIcon, CheckIcon, Cross1Icon } from '@modulz/radix-icons';
import { BasicFormProps } from '../types/form';
import { requirements, computeStrength } from '../services/passwordValidation.service';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text
            color={meets ? 'teal' : 'red'}
            sx={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <CheckIcon /> : <Cross1Icon />} <Box ml={10}>{label}</Box>
        </Text>
    );
}

type ProgressColors = 'red' | 'yellow' | 'teal';

export default function RegisterForm({
    noShadow,
    noPadding,
    noSubmit,
    style
}: BasicFormProps) {
    const [error, setError] = useState<string>('');
    const theme = useMantineTheme();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [progressColor, setProgressColor] = useState<ProgressColors>('red');

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
    
        validationRules: {
            email: value => value.includes('@'),
            password: value => value.length > 0 && passwordStrength === 100,
            passwordConfirm: (passwordConfirm, values) => passwordConfirm === values?.password
        },
    
        errorMessages: {
            email: 'Please enter a valid email',
            password: 'Please enter a password that meets all requirements',
            passwordConfirm: 'Please enter the same passwords'
        },
    });

    const checks = requirements.map((requirement, i) => (
        <PasswordRequirement key={i} label={requirement.label} meets={requirement.re.test(form.values.password)} />
    ));

    // whenever password changes, compute the following states
    useEffect(() => {
        const newStrength = computeStrength(form.values.password);
        setPasswordStrength(newStrength);

        const newProgressColor: ProgressColors = newStrength === 100 ? 'teal' : newStrength > 50 ? 'yellow' : 'red';
        setProgressColor(newProgressColor);
    }, [form.values.password])

    const handleSubmit = async () => {
        console.log('signing up');
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
            <Title order={2} mb="md" >Register</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    required
                    placeholder="Your email"
                    label="Email"
                    icon={<EnvelopeOpenIcon/>}
                    {...form.getInputProps('email')}
                />
                <Popover
                    opened={popoverOpened}
                    position="bottom"
                    placement="start"
                    withArrow
                    styles={{ popover: { width: '100%' }, root: {display: 'block'} }}
                    noFocusTrap
                    transition="pop-top-left"
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                    target={
                        <PasswordInput
                            my="md"
                            required
                            placeholder="Your password"
                            label="Password"
                            icon={<LockClosedIcon/>}
                            {...form.getInputProps('password')}
                        />
                    }
                >
                    <Progress color={progressColor} value={passwordStrength} size={5} style={{ marginBottom: 10 }} />
                    <PasswordRequirement label="Includes at least 6 characters" meets={form.values.password.length > 5} />
                    {checks}
                </Popover>
                
                <PasswordInput
                    my="md"
                    required
                    placeholder="Confirm your password"
                    label="Confirm Password"
                    icon={<LockClosedIcon/>}
                    {...form.getInputProps('passwordConfirm')}
                />

                {error && (
                    <Text color="red" size="sm" mt="sm">
                        {error}
                    </Text>
                )}

                <Button color="blue" type="submit">
                    Register
                </Button>
            </form>
        </Paper>
    )
}