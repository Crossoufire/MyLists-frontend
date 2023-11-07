

export default function HLine({mtop=6, mbot=10, color}) {
    return (
        <hr className={`m-t-${mtop} m-b-${mbot} ${color}`} style={{color: color}}/>
    );
}