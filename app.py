from flask import Flask,redirect,url_for,render_template 
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("home1.html")

@app.route("/login1")
def login():
    return render_template("login1.html")

@app.route("/report1")
def report():
    return render_template("report1.html")

@app.route("/title1")
def title():
    return render_template("title1.html")

@app.route("/dashboard1")
def dashboard():
    return render_template("dashboard1.html")

@app.route("/login_register")
def login_register():
    return render_template("login_register.html")

@app.route("/home2")
def home2():
    return render_template("home2.html")

@app.route("/dashboard2")
def dashboard2():
    return render_template("dashboard2.html")

if __name__ == '__main__':
    app.run(debug=True)