class Foo {
	constructor() {
		this.value = "class field";
	}
}


module.exports = {
	foo: "Lorem ipsum dolor sit amet",
	bar: {
		baz: "Lipsum JS",
		nested: {
			value: true,
			number: 5,
			cls: new Foo()
		}
	}
};