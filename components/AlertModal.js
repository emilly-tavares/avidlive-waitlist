import styles from '../styles/alertModal.module.css'

function AlertModal({message, onClose}){
    return (
        <div className={styles.alert_container} onClick={onClose}>
            <div className={styles.alert_div} onClick={(e) => e.stopPropagation()}>

                <p className={styles.alert_text}>{message}</p>
                <button className={styles.alert_button} onClick={onClose}>Ok</button>

            </div>


        </div>

    );

}

export default AlertModal;