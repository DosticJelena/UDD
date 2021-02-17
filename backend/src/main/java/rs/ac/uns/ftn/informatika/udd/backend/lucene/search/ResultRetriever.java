package rs.ac.uns.ftn.informatika.udd.backend.lucene.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
        			indexUnit.getAuthorLName(), indexUnit.getGenre()));
		}
        
		
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
