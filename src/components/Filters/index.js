import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import isEmpty from 'lodash/isEmpty';


const styles = {
    root: {
        background: 'transparent',
        boxShadow: 'none',
    },
    content: {
        paddingTop: 0,
    },
    actions: {
        paddingLeft: 16,
        paddingBottom: 32,
    },
};

class Filters extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    constructor() {
        super();
        this.clear = this.clear.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { filters, initialize } = this.props;
        if (!filters || filters !== nextProps.filters) {
            initialize(nextProps.filters);
        }
    }

    clear() {
        const filters = {};
        const { initialize, onSubmit } = this.props;
        initialize(filters);
        onSubmit(fromJS(filters));
    }

    render() {
        const { children, simpleSearch, handleSubmit, onSubmit } = this.props;

        if (simpleSearch) {
            return (
                <form
                    onSubmit={handleSubmit((values) => onSubmit(values))}
                >
                    {this.renderActions()}
                </form>
            );
        }

        return (
            <form
                onSubmit={handleSubmit((values) => onSubmit(values))}
            >
                <Card
                    style={styles.root}
                    initiallyExpanded={false}
                >
                    <CardText
                        style={styles.content}
                        expandable
                    >
                        {children}
                    </CardText>

                    <CardHeader
                        title="Advanced Search"
                        actAsExpander
                        showExpandableButton
                    />

                </Card>
                {this.renderActions()}
            </form>
        );
    }

    renderActions() {
        const { pristine, submitting, filters } = this.props;
        return (
            <CardActions
                style={styles.actions}
                expandable
            >
                <RaisedButton
                    type="submit"
                    label="Search"
                    disabled={pristine || submitting}
                    secondary
                />
                <FlatButton
                    type="button"
                    label="Clear"
                    disabled={submitting || (pristine && isEmpty(filters))}
                    onClick={this.clear}
                />
            </CardActions>
        );
    }
}

Filters.propTypes = {
    filters: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    children: PropTypes.element,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    simpleSearch: PropTypes.bool,
};

export default Filters;
