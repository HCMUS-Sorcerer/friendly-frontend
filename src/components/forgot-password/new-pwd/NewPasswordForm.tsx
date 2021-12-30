import * as React from "react";
import ToggleInputField from "../../common/input-field/toggle/ToggleInputField";
import NextButton from "../../common/btn-next/NextButton";
import classes from "./NewPasswordForm.module.css";
import {
    forgotPasswordActions,
    ResetPasswordRequest,
    selectEmail,
    selectError,
    selectIsPending,
    selectOtp,
} from "../../../app/reducers/forgot-pwd-slice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { validatePassword } from "../../../utils/helpers";

export interface NewPasswordFormProps {
    goToNextStep: () => void;
}

export default function NewPasswordForm({ goToNextStep }: NewPasswordFormProps) {
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSubmitClick, setIsSubmitClick] = React.useState(false);

    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector(selectError);
    const pending = useAppSelector(selectIsPending);
    const otp = useAppSelector(selectOtp);
    const email = useAppSelector(selectEmail);

    React.useEffect(() => {
        console.log(pending);
        if (!pending) {
            if (errorMessage.length > 0) {
                alert(errorMessage);
            } else {
                goToNextStep();
            }
        }
    }, [isSubmitClick, pending]);

    const onSubmitHandler = () => {
        if (newPassword === confirmPassword) {
            console.log("Submit");
            goToNextStep();
        } else {
            if (newPassword !== confirmPassword) {
                alert("Password and confirm password not match");
                return;
            }
            const request: ResetPasswordRequest = {
                email: email,
                password: newPassword,
                confirmPassword: confirmPassword,
                otp: otp,
            };
            dispatch(forgotPasswordActions.resetPassword(request));
        }
    };

    const receiveNewPassword = (newPassword: string) => {
        setNewPassword(newPassword);
    };

    const receiveConfirmPassword = (confirmPassword: string) => {
        setConfirmPassword(confirmPassword);
    };

    return (
        <form className={classes.form}>
            <div className={classes["input-group"]}>
                <label htmlFor="new-pwd" className={classes.labels}>
                    MẬT KHẨU MỚI
                </label>
                <ToggleInputField id="new-pwd" receiveValue={receiveNewPassword} />
            </div>
            <div className={classes["input-group"]}>
                <label htmlFor="confirm-pwd" className={classes.labels}>
                    NHẬP LẠI MẬT KHẨU
                </label>
                <ToggleInputField id="confirm-pwd" receiveValue={receiveConfirmPassword} />
            </div>
            <div className={classes.redirects}>
                <NextButton onSubmit={onSubmitHandler} />
            </div>
        </form>
    );
}
