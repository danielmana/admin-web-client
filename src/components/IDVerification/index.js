import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

const styles = {
    row: {
        display: 'flex',
    },
    item: {
        width: '100%',
        margin: '0 5px',
        verticalAlign: 'bottom',
    },
};

class IDVerification extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        const { verification } = this.props;
        return (
            <div>
                <AppBar
                    title="ID Verification"
                    showMenuIconButton={false}
                />
                <Card>
                    <div style={styles.row}>
                        {this.renderEmailageScore(verification.score)}
                    </div>
                    <div style={styles.row}>
                        {this.renderBVIScore(verification.BVI)}
                        {this.renderCVIScore(verification.CVI)}
                    </div>
                    <div style={styles.row}>
                        {this.renderRiskCode(verification.riskCodes)}
                    </div>
                    <div style={styles.row}>
                        {this.renderIPAddress(verification.ip)}
                    </div>
                </Card>
            </div>
        );
    }

    renderEmailageScore(value) {
        return (
            <TextField
                name="emailAgeScore"
                floatingLabelText="Emailage Score"
                value={value || ''}
                style={styles.item}
                disabled
            />
        );
    }

    renderBVIScore(value) {
        return (
            <TextField
                name="BVI"
                floatingLabelText="BVI Score"
                value={value || ''}
                style={styles.item}
                disabled
            />
        );
    }

    renderCVIScore(value) {
        return (
            <TextField
                name="CVI"
                floatingLabelText="CVI Score"
                value={value || ''}
                style={styles.item}
                disabled
            />
        );
    }

    renderRiskCode(value) {
        return (
            <TextField
                name="riskCode"
                value={value || ''}
                floatingLabelText="Risk Code"
                style={styles.item}
                disabled
            />
        );
    }

    renderIPAddress(value) {
        return (
            <TextField
                name="ip"
                floatingLabelText="IP Address"
                value={value || ''}
                style={styles.item}
                disabled
            />
        );
    }
}

IDVerification.propTypes = {
    verification: PropTypes.object,
};

export default IDVerification;
