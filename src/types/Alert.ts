export type AlertProps = {
    message: string;
    type?: 'success' | 'error' | 'info';
    visible: boolean;
    onHide: () => void;
    duration?: number;
  };