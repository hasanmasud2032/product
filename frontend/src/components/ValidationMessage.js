const ValidationMessage = ({ data, field }) => {
    return (
        <p style={{ color:'red',padding: '5px' }}>{data[field] ? data[field][0] : null}</p>
    )
}

export default ValidationMessage