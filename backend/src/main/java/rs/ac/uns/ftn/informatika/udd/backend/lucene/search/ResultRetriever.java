package rs.ac.uns.ftn.informatika.udd.backend.lucene.search;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.SearchResultMapper;
import org.springframework.data.elasticsearch.core.aggregation.AggregatedPage;
import org.springframework.data.elasticsearch.core.aggregation.impl.AggregatedPageImpl;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.informatika.udd.backend.lucene.indexing.handlers.DocumentHandler;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.indexing.handlers.PDFHandler;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.indexing.handlers.TextDocHandler;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.indexing.handlers.Word2007Handler;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.indexing.handlers.WordHandler;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.IndexUnit;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.RequiredHighlight;
import rs.ac.uns.ftn.informatika.udd.backend.lucene.model.ResultData;
import rs.ac.uns.ftn.informatika.udd.backend.repository.BookRepository;

@Service
public class ResultRetriever {
	
	@Autowired
	private BookRepository repository;
	
	@Autowired 
	ElasticsearchOperations operations;
	
	@Autowired
	ElasticsearchTemplate eTemplate;
	
	public ResultRetriever(){
	}

	public List<ResultData> getResults(org.elasticsearch.index.query.QueryBuilder query,
			List<RequiredHighlight> requiredHighlights) {
		if (query == null) {
			return null;
		}
			
		List<ResultData> results = new ArrayList<ResultData>();
		
        for (IndexUnit indexUnit : repository.search(query)) {
        	results.add(new ResultData(indexUnit.getTitle(), indexUnit.getKeywords(), 
        			indexUnit.getFilename(), "", indexUnit.getText(), indexUnit.getAuthorFName(), 
        			indexUnit.getAuthorLName(), indexUnit.getGenre(), indexUnit.getLatitude(), indexUnit.getLongitude()));
		}
        
		
		return results;
	}
	
	public List<ResultData> getResultss(NativeSearchQuery query, List<RequiredHighlight> requiredHighlights) {
		if (query == null) {
			return null;
		}
		
		final List<RequiredHighlight> highlights = requiredHighlights;
		final List<ResultData> results = new ArrayList<ResultData>();

		Page<IndexUnit> sampleEntities = eTemplate.queryForPage(query, IndexUnit.class, new SearchResultMapper() {
	        public <T>AggregatedPage<T> mapResults(SearchResponse response, Class<T> clazz, Pageable pageable) {
	            for (SearchHit searchHit : response.getHits()) {
	                if (response.getHits().getHits().length <= 0) {
	                    return null;
	                }
	                ResultData res = new ResultData(
	                		(String) searchHit.getSource().get("title"), 
	                		(String) searchHit.getSource().get("keywords"), 
	                		(String) searchHit.getSource().get("filename"), 
	                		searchHit.getHighlightFields().get(highlights.get(0).getFieldName()).fragments()[0].toString(),
	                		(String) searchHit.getSource().get("text"), 
	                		(String) searchHit.getSource().get("authorFName"), 
	                		(String) searchHit.getSource().get("authorLName"), 
	                		(String) searchHit.getSource().get("genre"),
	                		(String) searchHit.getSource().get("latitude"),
	                		(String) searchHit.getSource().get("longitude"));
	                results.add(res);
	            }
	            if (results.size() > 0) {
	                return null; //ew AggregatedPageImpl<T>((List<T>) results)
	            }
	            return null;
	        }

	    });
		
        return results;
	}
	
	
	protected DocumentHandler getHandler(String fileName){
		if(fileName.endsWith(".txt")){
			return new TextDocHandler();
		}else if(fileName.endsWith(".pdf")){
			return new PDFHandler();
		}else if(fileName.endsWith(".doc")){
			return new WordHandler();
		}else if(fileName.endsWith(".docx")){
			return new Word2007Handler();
		}else{
			return null;
		}
	}
}
