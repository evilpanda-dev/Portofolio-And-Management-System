import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AlertContext } from "../providers/AlertProvider";
import AlertWindow from "../components/AlertWindow/AlertWindow";

export const useAlert = () => {
    const { setAlert } = useContext(AlertContext);
    const dispatch = useDispatch();
    return useCallback((data, message) => {
        try {
            if (data.meta.requestStatus == "fulfilled") {
                setAlert({
                    appAlerts:
                        alert = (
                            <AlertWindow message={message} alertType={"success"} />
                        )
                })
            }
            else {
                throw new Error(data.payload)
            }
        } catch (error) {
            setAlert({
                appAlerts:
                    alert = (
                        <AlertWindow message={error.message} alertType="error" />
                    )
            })
        }
        finally {
            dispatch({ type: "WINDOW_ACTIVATED", payload: true });
        }
    }, [dispatch, setAlert])
}