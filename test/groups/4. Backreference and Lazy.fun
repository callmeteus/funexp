// /just confirming that (.+?) is \1/

literal|just confirming that
space

group
	any
	quantifier(+)
	lazy

space
literal|is
space
reference(group=1)