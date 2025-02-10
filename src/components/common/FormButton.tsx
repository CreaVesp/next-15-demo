import {Button} from "@heroui/button";

interface FormButtonProps {
    children: React.ReactNode;
    isLoading?: boolean;
}

export default function FormButton({children, isLoading}: FormButtonProps) {
    return <Button type={'submit'} color={'primary'} isLoading={isLoading}>{children}</Button>
}