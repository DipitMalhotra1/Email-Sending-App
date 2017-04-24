var EmailBody = function(body) {
        return (
            `<div style="background-color:#eeeeee;border-collapse:collapse;height:100%;margin:0;padding:30px 0 0 0;width:100%">
                <div style="width:100%">
                    <div style="margin:0 auto;max-width:800px;width:80%;border-radius:2px">
                        <div style="background-color:#ffffff;padding:8px" ><img src="http://www.colaberry.com/assets/img/colaberrylogosmall.png" height="47px" style="height:47px!important;width:auto" ></div>
                        <div>
                            <div style="margin-left:auto;margin-right:auto;margin-bottom:20px">
                                <div style="display:block">
                                    <div style="max-width:800px;background-color:#fafafa;margin:0;padding:30px">
                                        <div style="width:100%;margin-left:auto;margin-right:auto;font-size:18px">`+
                                            body +
                                        `</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width:100%;margin-top:10px" align="center">
                    <table>
                        <tbody>
                        <tr>
                            <td valign="top" style="padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#656565;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center"><em>Copyright © 2016 Filtered All rights reserved.</em><br>&nbsp;</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style="background-color:#3b3738;width:100%;padding-top:10px;padding-bottom:10px">
                    <table style="margin:0 auto;max-width:800px;width:80%">
                        <tbody>
                        <tr>
                            <td style="width:90px;padding:0"><img src="https://cdn.auth0.com/avatars/te.png" style="border-radius:50%"height="75" width="75"></td>
                            <td style="text-align:left;padding:0">
                                <span style="margin-bottom:5px;color:#dddddd;font-family:Helvetica">Sent by:</span>
                                <p style="margin-top:5px;margin-bottom:5px;color:#ffffff;font-family:Helvetica;font-weight:400;font-size:large">Test User</p>
                                <a style="font-family:Helvetica;color:#2196f3" target="_blank">Contact me</a>
                            </td>
                            <td style="width:120px;text-align:right"><img src="https://www.filtered.ai/images/logo_poweredby.png" style="width:inherit"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>`
        );
};

var ComposeEmailForm = React.createClass({
    getInitialState: function () {
        return {to: '', cc: '', bcc: '',subject: '', body: ''};
    },
    handleToChange: function (e) {
        this.setState({to: e.target.value});
    },
    handleCCChange: function (e) {
        this.setState({cc: e.target.value});
    },
    handleBCCChange: function (e) {
        this.setState({bcc: e.target.value});
    },
    handleSubjectChange: function (e) {
        this.setState({subject: e.target.value});
    },
    handleBodyChange: function (e) {
        this.setState({body: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var to = this.state.to.trim();
        var cc = this.state.cc.trim();
        var bcc = this.state.bcc.trim();
        var subject = this.state.subject.trim();
        var body = this.state.body.trim();
        var htmlBody = EmailBody(body.replace(/\n/g, "<br/>"));
        var email = {to: to,cc:cc, bcc:bcc, subject: subject, body: htmlBody};
        $.ajax({
            url: "http://localhost:3000/api/email/send",
            data: email,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log("Sent email");
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("Error Processing request");
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s1"></div>
                    <div className="col s10 compose">
                        <h1>New Email</h1>
                        <form name="Compose Email" onSubmit={this.handleSubmit}>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="to" type="email" className="validate" value={this.state.to}
                                           onChange={this.handleToChange}/>
                                    <label for="to" data-error="wrong" data-success="right">To</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="cc" type="email" className="validate" value={this.state.cc}
                                           onChange={this.handleCCChange}/>
                                    <label for="cc" data-error="wrong" data-success="right">CC</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="bcc" type="email" className="validate" value={this.state.bcc}
                                           onChange={this.handleBCCChange}/>
                                    <label for="bcc" data-error="wrong" data-success="right">BCC</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="subject" type="text" value={this.state.subject}
                                           onChange={this.handleSubjectChange}/>
                                    <label for="subject" data-error="wrong" data-success="right">Subject</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="icon_prefix2" className="materialize-textarea body" placeholder="Body"
                                              rows="10"
                                              value={this.state.body}
                                              onChange={this.handleBodyChange}></textarea>

                                </div>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </form>
                    </div>
                    <div className="col s1"></div>
                </div>
            </div>

                                               );
    }
});

ReactDOM.render(
    <ComposeEmailForm/>,
    document.getElementById('composer')
);
