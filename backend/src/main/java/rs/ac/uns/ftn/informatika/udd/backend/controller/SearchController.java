package rs.ac.uns.ftn.informatika.udd.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.highlight.HighlightBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.AdvancedQuery;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.LocationQuery;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.RequiredHighlight;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.ResultData;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.SearchType;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.SimpleQuery;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.search.QueryBuilder;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.search.ResultRetriever;

@CrossOrigin(origins = "*")
@RestController
public class SearchController {

		@Autowired
		private ResultRetriever resultRetriever;
		
		@PostMapping(value="/search/term", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchTerrmQuery(@RequestBody SimpleQuery simpleQuery) throws Exception {		
			org.elasticsearch.index.query.QueryBuilder query= QueryBuilder.buildQuery(SearchType.regular, simpleQuery.getField(), simpleQuery.getValue());
			NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
					  .withQuery(query)
					  .withHighlightFields(new HighlightBuilder.Field(simpleQuery.getField()).fragmentSize(300).preTags("<strong>").postTags("</strong>"))
					  .build();
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
			List<ResultData> results = resultRetriever.getResultss(searchQuery, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/fuzzy", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchFuzzy(@RequestBody SimpleQuery simpleQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query= QueryBuilder.buildQuery(SearchType.fuzzy, simpleQuery.getField(), simpleQuery.getValue());
			NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
					  .withQuery(query)
					  .withHighlightFields(new HighlightBuilder.Field(simpleQuery.getField()).fragmentSize(300).preTags("<strong>").postTags("</strong>"))
					  .build();
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
			List<ResultData> results = resultRetriever.getResultss(searchQuery, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/prefix", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchPrefix(@RequestBody SimpleQuery simpleQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query= QueryBuilder.buildQuery(SearchType.prefix, simpleQuery.getField(), simpleQuery.getValue());
			NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
					  .withQuery(query)
					  .withHighlightFields(new HighlightBuilder.Field(simpleQuery.getField()).fragmentSize(300).preTags("<strong>").postTags("</strong>"))
					  .build();
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
			List<ResultData> results = resultRetriever.getResultss(searchQuery, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
//		@PostMapping(value="/search/range", consumes="application/json")
//		public ResponseEntity<List<ResultData>> searchRange(@RequestBody SimpleQuery simpleQuery) throws Exception {
//			org.elasticsearch.index.query.QueryBuilder query= QueryBuilder.buildQuery(SearchType.range, simpleQuery.getField(), simpleQuery.getValue());
//			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
//			rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
//			List<ResultData> results = resultRetriever.getResults(query, rh);			
//			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
//		}
		
		@PostMapping(value="/search/phrase", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchPhrase(@RequestBody SimpleQuery simpleQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query= QueryBuilder.buildQuery(SearchType.phrase, simpleQuery.getField(), simpleQuery.getValue());
			NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
					  .withQuery(query)
					  .withHighlightFields(new HighlightBuilder.Field(simpleQuery.getField()).fragmentSize(300).preTags("<strong>").postTags("</strong>"))
					  .build();
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(simpleQuery.getField(), simpleQuery.getValue()));
			List<ResultData> results = resultRetriever.getResultss(searchQuery, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/boolean/regular", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchBoolean(@RequestBody AdvancedQuery advancedQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query1 = QueryBuilder.buildQuery(SearchType.regular, advancedQuery.getField1(), advancedQuery.getValue1());
			org.elasticsearch.index.query.QueryBuilder query2 = QueryBuilder.buildQuery(SearchType.regular, advancedQuery.getField2(), advancedQuery.getValue2());
			
			BoolQueryBuilder builder = QueryBuilders.boolQuery();
			if(advancedQuery.getOperation().equalsIgnoreCase("AND")){
				builder.must(query1);
				builder.must(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("OR")){
				builder.should(query1);
				builder.should(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("NOT")){
				builder.must(query1);
				builder.mustNot(query2);
			}
			
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(advancedQuery.getField1(), advancedQuery.getValue1()));
			rh.add(new RequiredHighlight(advancedQuery.getField2(), advancedQuery.getValue2()));
			List<ResultData> results = resultRetriever.getResults(builder, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/boolean/fuzzy", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchBooleanFuzzy(@RequestBody AdvancedQuery advancedQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query1 = QueryBuilder.buildQuery(SearchType.fuzzy, advancedQuery.getField1(), advancedQuery.getValue1());
			org.elasticsearch.index.query.QueryBuilder query2 = QueryBuilder.buildQuery(SearchType.fuzzy, advancedQuery.getField2(), advancedQuery.getValue2());
			
			BoolQueryBuilder builder = QueryBuilders.boolQuery();
			if(advancedQuery.getOperation().equalsIgnoreCase("AND")){
				builder.must(query1);
				builder.must(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("OR")){
				builder.should(query1);
				builder.should(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("NOT")){
				builder.must(query1);
				builder.mustNot(query2);
			}
			
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(advancedQuery.getField1(), advancedQuery.getValue1()));
			rh.add(new RequiredHighlight(advancedQuery.getField2(), advancedQuery.getValue2()));
			List<ResultData> results = resultRetriever.getResults(builder, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/boolean/prefix", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchBooleanPrefix(@RequestBody AdvancedQuery advancedQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query1 = QueryBuilder.buildQuery(SearchType.prefix, advancedQuery.getField1(), advancedQuery.getValue1());
			org.elasticsearch.index.query.QueryBuilder query2 = QueryBuilder.buildQuery(SearchType.prefix, advancedQuery.getField2(), advancedQuery.getValue2());
			
			BoolQueryBuilder builder = QueryBuilders.boolQuery();
			if(advancedQuery.getOperation().equalsIgnoreCase("AND")){
				builder.must(query1);
				builder.must(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("OR")){
				builder.should(query1);
				builder.should(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("NOT")){
				builder.must(query1);
				builder.mustNot(query2);
			}
			
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(advancedQuery.getField1(), advancedQuery.getValue1()));
			rh.add(new RequiredHighlight(advancedQuery.getField2(), advancedQuery.getValue2()));
			List<ResultData> results = resultRetriever.getResults(builder, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/boolean/phrase", consumes="application/json")
		public ResponseEntity<List<ResultData>> searchBooleanPhrase(@RequestBody AdvancedQuery advancedQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query1 = QueryBuilder.buildQuery(SearchType.phrase, advancedQuery.getField1(), advancedQuery.getValue1());
			org.elasticsearch.index.query.QueryBuilder query2 = QueryBuilder.buildQuery(SearchType.phrase, advancedQuery.getField2(), advancedQuery.getValue2());
			
			BoolQueryBuilder builder = QueryBuilders.boolQuery();
			if(advancedQuery.getOperation().equalsIgnoreCase("AND")){
				builder.must(query1);
				builder.must(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("OR")){
				builder.should(query1);
				builder.should(query2);
			}else if(advancedQuery.getOperation().equalsIgnoreCase("NOT")){
				builder.must(query1);
				builder.mustNot(query2);
			}
			
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			rh.add(new RequiredHighlight(advancedQuery.getField1(), advancedQuery.getValue1()));
			rh.add(new RequiredHighlight(advancedQuery.getField2(), advancedQuery.getValue2()));
			List<ResultData> results = resultRetriever.getResults(builder, rh);			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
		
		@PostMapping(value="/search/geo", consumes="application/json")
		public ResponseEntity<List<ResultData>> search(@RequestBody LocationQuery simpleQuery) throws Exception {
			org.elasticsearch.index.query.QueryBuilder query=QueryBuilders.geoDistanceQuery("geo")
					.point(simpleQuery.getLatitude(), simpleQuery.getLongitude()).distance(100, DistanceUnit.KILOMETERS);
			List<RequiredHighlight> rh = new ArrayList<RequiredHighlight>();
			List<ResultData> results = resultRetriever.getResults(query, rh);
			
			return new ResponseEntity<List<ResultData>>(results, HttpStatus.OK);
		}
	
		
	
}
