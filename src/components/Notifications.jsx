import { useRef } from "react";
import { useTranslation } from "react-i18next";

// notifications
import { SnackbarSettings } from '@settings/SnackbarSettings';
import { SnackbarProvider, closeSnackbar } from 'notistack';

// components
import ActionButton from "@components/button/ActionButton";

const Notifications = () => {
  const { t } = useTranslation();
  const snackbarREF = useRef();

  return (
    <>
      <SnackbarProvider
        ref={snackbarREF}
        {...SnackbarSettings}
        action={(snackbarId) =>
          <ActionButton value={t('common.close')} onClick={() => closeSnackbar(snackbarId)} />
        }
      />
    </>
  )
}
export default Notifications