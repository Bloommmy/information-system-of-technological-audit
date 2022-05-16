import popupStyles from './Popup.module.css';

export const Popup = ({ show, name, children, onClose }) => {
  const visibility = show ? 'visible' : 'hidden';
  const onShadowClick = (e) => e.target === e.currentTarget ? onClose() : null;

  return (
    <div className={popupStyles.shadow} style={{ visibility }} onClick={onShadowClick}>
      <div className={popupStyles.popup}>
        <h3 className={popupStyles.title}>{name}</h3>
        <div className={popupStyles.closeButton} onClick={onClose} />
        <div>{children}</div>
      </div>
    </div>
  );
}
