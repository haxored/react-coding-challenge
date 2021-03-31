import React from 'react';
import { Col, Container, Form, Button, Alert, Image } from 'react-bootstrap';
import { connect } from "react-redux";
import NoImage from '../img/others/no-image-available.jpg'
import Loader from '../img/others/loader.svg'
import { fetchResults } from "./ResultActions";

class QueryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.omdbapi.com/', 
            body: 'N/A',
            headers: 'N/A',
            apiKey: '2f1a7f21',
            httpMethod: 'GET',
            keyword: 'Star Wars',
            task: 'start',
            showPage: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleBack(e) {
        e.preventDefault();
        this.setState({
            task: "start"
        });
    }

    handlePageClick(e){
        e.preventDefault();
        this.setState({
            showPage: e.target.id,
        });
    }

    saveFilteredList(arr) {
        this.setState({
            movie: arr
        });
    }
  
    async handleSubmit(e) {
        e.preventDefault();
        const apiurl = new URL(this.state.url);
        const httpmethod = this.state.httpMethod;

        apiurl.searchParams.append("type", "movie");
        apiurl.searchParams.append("apikey", this.state.apiKey);
        apiurl.searchParams.append("s", this.state.keyword);
        this.props.dispatch(fetchResults(apiurl, httpmethod));
        this.setState({
            showPage: 1,
        });
        this.setState({
            task: "submitted"
        });
    }
  
    render() {
        const { error, loading, results, totalpages } = this.props;
        let key = this.state.showPage;

        if (this.state.task === 'start') {
            return (
                <Container className="p-3">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                URL
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="url" value={this.state.url} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                Authorization Token
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="apiKey" value={this.state.apiKey} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                Headers
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="headers" value={this.state.headers} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                Body
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                HTTP Method
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="httpMethod" value={this.state.httpMethod} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row className="p-2">
                                <Form.Label column lg={3}>
                                Search Keyword
                                </Form.Label>
                                <Col>
                                <Form.Control type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Button className="float-right" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            );
        }
        if (this.state.task === 'submitted') {
            if (error) {
                return (
                    <>
                        <div className="p-3">
                            <div className="top-text"><p className="font-weight-bold">RESULTS</p></div>
                            <Alert variant='warning'>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>
                                    {error}
                                </p>
                            </Alert>
                            <Button className="float-right" variant="primary" onClick={this.handleBack}>
                                Go Back
                            </Button>
                        </div>
                    </>
                );
              }
          
              if (loading) {
                return (
                    <>
                    <div className="p-3">
                        <div className='top-text'><p className="font-weight-bold">RESULTS</p></div>
                        <div className='about'>
                            <div><Image src={Loader} alt="loader" fluid /></div>
                        </div>
                    </div>

                    </>
                );
              }
            return (
                <>
                <div className="p-3" key={key}>
                    <div className="top-text"><p className="font-weight-bold">RESULTS ({totalpages} Pages)</p></div>
                    {results.map(movie => (
                            <div className='res-card ' style={{ display: (movie.Page == key ? 'flex' : 'none') }}>
                                <div className='res-card-img text-center'><Image src={movie.Poster !== 'N/A' ? movie.Poster.replace('SX300','SY200') : NoImage} alt-text={movie.Title} height={200} /></div>
                                <div className='res-card-main'>
                                    <p><span className="font-weight-bold">Title: </span>{movie.Title} {this.state.showPage} {movie.Page}</p>
                                    <p><span className="font-weight-bold">Year: </span>{movie.Year}</p>
                                    <p><span className="font-weight-bold">Type: </span>{movie.Type}</p>
                                    <div className="res-card-plot pl-3 font-weight-bold"> Plot:</div><div className="res-card-plot pl-3">{movie.Plot}</div>
                                </div>
                            </div>
                    ))}
                    <div className="bottom-text">
                    {
                        runCallback(() => {
                            const pages = [];
                            for(let i=1; i<=totalpages; i++){
                                pages.push(<p key={i} className='mr-2 font-weight-bold'><Button id={i} className={key == i ? 'btn-primary' : 'btn-secondary'} onClick={key == i ? '' : this.handlePageClick}>{i}</Button></p>);
                            }
                            pages.push(<p className='ml-5 font-weight-bold'><Button className='btn-success' onClick={this.handleBack}>Back</Button></p>);
                            return pages;
                        })
                    }
                    </div>
                </div>
                </>
            );
        }
    }
}

const mapStateToProps = state => ({
    results: state.results.items,
    totalpages: state.results.totalpages,
    loading: state.results.loading,
    error: state.results.error,
});

const runCallback = (cb) => {
    return cb();
};

export default connect(mapStateToProps)(QueryForm);