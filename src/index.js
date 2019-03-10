class Hello {
    static heyThere = 5;
    static myGod = 7;

    constructor() {
        this.heyThere = Hello.heyThere;
    }

    greet() {
        console.log(this.heyThere);
    }
}

const hello = new Hello();
hello.greet();