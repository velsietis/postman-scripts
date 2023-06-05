// Disable any query parameters listed the variable DISABLED_QUERY_PARAMS
const dqp = pm.variables.get("DISABLED_QUERY_PARAMS");
if (dqp && dqp.trim() !== "") {
  const queryParamsToDisable = dqp.split(",").map(param => param.trim());
  pm.request.url.query.all().forEach(({key}) => {      
    if (queryParamsToDisable.includes(key)) {
       pm.request.url.query.remove(key);
    }
  });
}

//Resolve any variable references in iteration data
//Useful if you want to parameterise some of the values in your test data file
function doubleResolve(variable){
    const value = pm.iterationData.get(variable);
    if (/{{.*}}/.test(value)){
        pm.iterationData.set(variable, pm.variables.replaceIn(value));
    }
   
}
Object.keys(pm.iterationData.toObject()).forEach(doubleResolve);