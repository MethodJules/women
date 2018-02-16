<?php
/**
 * Created by PhpStorm.
 * User: hofer
 * Date: 10.07.2017
 * Time: 09:34
 */


function query_research_results($type) {
    //dsm($type);
	switch($type){
		case ("ergebnistyp"):
			$sql_query = "SELECT terms.name, count(terms.name) AS Anzahl FROM {field_data_field_forschungsergebnistyp} AS fe_typ INNER JOIN {taxonomy_term_data} AS terms 
				ON field_forschungsergebnistyp_tid = terms.tid GROUP BY terms.name;";
			break;
		case ("disziplinen"):
				
			$sql_query = "SELECT terms.name, count(terms.name) AS Anzahl FROM {field_data_field_forschungsdisziplin} AS fe_dis INNER JOIN {taxonomy_term_data} AS terms 
				ON field_forschungsdisziplin_tid = terms.tid GROUP BY terms.name;";
			break;
		case ("branchen"):
				
			$sql_query = "SELECT terms.name, count(terms.name) AS Anzahl FROM {field_data_field_branche_tax} AS fe_branche INNER JOIN {taxonomy_term_data} AS terms 
				ON field_branche_tax_tid = terms.tid GROUP BY terms.name;";
			break;
		case ("instrumente"):
				
			$sql_query = "SELECT terms.name, count(terms.name) AS Anzahl FROM {field_data_field_etablierte_instrumente} AS fe_instrumente INNER JOIN {taxonomy_term_data} AS terms 
				ON field_etablierte_instrumente_tid = terms.tid GROUP BY terms.name;";
			break;


	}
	//dsm($sql_query->fetchAll());
	$result = db_query($sql_query);
	return $result;
}
