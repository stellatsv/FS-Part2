const App = () => {
	const courses = [
	  {
		name: 'Half Stack application development',
		id: 1,
		parts: [
		  {
			name: 'Fundamentals of React',
			exercises: 10,
			id: 1
		  },
		  {
			name: 'Using props to pass data',
			exercises: 7,
			id: 2
		  },
		  {
			name: 'State of a component',
			exercises: 14,
			id: 3
		  },
		  {
			name: 'Redux',
			exercises: 11,
			id: 4
		  }
		]
	  }, 
	  {
		name: 'Node.js',
		id: 2,
		parts: [
		  {
			name: 'Routing',
			exercises: 3,
			id: 1
		  },
		  {
			name: 'Middlewares',
			exercises: 7,
			id: 2
		  }
		]
	  }
	]

	return (
		courses.map(course => 
		 	<Course course={course} />
		)
	)
  }

const Course = (props) => {
	return(
		<div>
			<Header course = {props.course.name}/>
			<Content parts = {props.course.parts}/>
			<Total parts = {props.course.parts}/>
		</div>
	)
}
const Header = (props) => {
	console.log(props)
	return (<div><h1>{props.course}</h1></div>)
}

const Content = (props) => {
	console.log(props)
	return (<div>
		{props.parts.map(part => 
			<Part name={part.name} number={part.exercises}/>
		)}
	</div>
	)
}

const Total = (props) => {
	console.log(props)
	var initialValue = 0
	const total = 
  		props.parts.reduce((s, p) => s + p.exercises, initialValue)
	return (<div>
		<p>Total of {total} exercises </p>
	</div>
	)
}

const Part = (props) => {
	console.log(props)
	return (
		<div>
			<p>
				{props.name} {props.number}
			</p>
		</div>
	) 
}

export default App
