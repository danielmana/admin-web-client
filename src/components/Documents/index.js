import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import DialogUploadDocument from 'containers/EnrollmentPageDetail/DialogUploadDocument/index';
import map from 'lodash/map';

import { apiBasePath } from 'config';


class Documents extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor(props) {
        super(props);
        this.uploadAction = this.uploadAction.bind(this);
        this.handleDialogUpload = this.handleDialogUpload.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);
        this.renderDocument = this.renderDocument.bind(this);

        this.state = {
            open: false,
        };
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Documents"
                    showMenuIconButton={false}
                    iconElementRight={this.uploadAction()}
                />
                <Card>
                    {this.renderUploadedDocuments()}
                </Card>
                {this.renderDialogUpload()}
            </div>
        );
    }

    uploadAction() {
        return (
            <FlatButton
                label="Upload"
                onClick={this.handleDialogUpload}
            />
        );
    }

    onDialogCancel() {
        this.setState({
            open: !this.state.open,
        });
    }

    handleDialogUpload() {
        this.setState({
            open: !this.state.open,
        });
    }

    renderDialogUpload() {
        const { businessID } = this.props;
        return (
            <DialogUploadDocument
                visible={this.state.open}
                onCancel={this.onDialogCancel}
                businessID={businessID}
            />
        );
    }

    renderUploadedDocuments() {
        const { documents } = this.props;
        return (
            <List>
                {map(documents, this.renderDocument)}
            </List>
        );
    }

    renderDocument(data) {
        const href = `${apiBasePath}/documents/${data.id}`;
        return (
            <ListItem
                key={data.id}
                primaryText={this.renderDocumentDownloadText(href, data.fileName)}
                rightIconButton={this.renderDocumentDownloadButton(href, data.fileName)}
                disabled
            />
        );
    }

    renderDocumentDownloadText(href, fileName) {
        return (
            <div
                style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {fileName}
            </div>
        );
    }

    renderDocumentDownloadButton(href, fileName) {
        return (
            <IconButton
                href={href}
                target="_self"
                download={fileName}
            >
                <FontIcon className="material-icons">file_download</FontIcon>
            </IconButton>
        );
    }
}

Documents.propTypes = {
    documents: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    businessID: PropTypes.number,
};

export default Documents;
