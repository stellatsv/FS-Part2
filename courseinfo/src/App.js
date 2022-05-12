const App = () => {
	const course = {
	  id: 1,
	  name: 'Half Stack application development',
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
		}
	  ]
	}
  
	return <Course course={course} />
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
	var total = 0
	props.parts.map(part => total += part.exercises)
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
